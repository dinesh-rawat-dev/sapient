var experss = require('express');
var fs = require('fs');
var _this = this;
var Item = require("../models/items");

/*
@ Description: Retrieve items
*/
exports.get = function(req, res) {
    var cback = function(err, items) {
        if (err) throw err;
        res.render("index", {
            products: items
        });
    };

    var cb = function(err, records) { //Checks records in db and saves the items
        if (err) throw err;
        if (!records.length) {
            _this.saveJson(cback);
        } else {
            cback(err, records);
        }
    }
    _this.checkInDb(cb); //Check if records are in db: First save
};

/*
@ Description: Save items
*/
exports.saveJson = function(cb) {
    var source = "./public/cart.json";

    fs.readFile(source, 'utf8', function(err, items) {
        if (err) throw err;
        var items = JSON.parse(items),
            products = [];
        items.forEach(function(obj, key) {
            var Product = new Item(obj);
            Product.save(function(err, result) {
                if (err) throw err;
                products.push(result);
                if (key == items.length - 1) {
                    cb(err, products)
                }
            });
        });
    });
};


/*
@ Description: Check records
*/
exports.checkInDb = function(cb) {
    Item.find({}, function(err, items) {
        cb(err, items)
    });
}


/*
@ Description: Update items
*/
exports.put = function(req, res) {
    var _id = req.body._id;
    delete req.body._id;

    Item.findOneAndUpdate({
        _id: _id
    }, req.body, { new: true }, function(err, item) {
        if (err) throw err;
        console.log(item)
        return res.status(200).send({
            success: true,
            product: item
        });
    });
}

/*
@ Description: Update items
*/
exports.delete = function(req, res) {
    Item.remove(req.body, function(err) {
        return res.status(200).send({success:true, msg: "Item deleted"});
    });
}
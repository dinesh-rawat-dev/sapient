var mongoose = require('mongoose');
var validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');

var schema = new mongoose.Schema({
    p_id: {
        type: String,
        required: true
    },
    p_name: {
        type: String
    },
    p_variation: {
        type: String
    },
    p_style: {
        type: String
    },
    p_image: {
        type: String
    },
    p_selected_color: {
        name: {
            type: String
        },
        hexcode: {
            type: String
        }
    },
    p_selected_size: {
        name: {
            type: String
        },
        code: {
            type: String
        }
    },
    p_available_options: {
        colors: [{
            name: {
                type: String
            },
            hexcode: {
                type: String
            }
        }, {
            name: {
                type: String
            },
            hexcode: {
                type: String
            }
        }, {
            name: {
                type: String
            },
            hexcode: {
                type: String
            }
        }],
        sizes: [{
            name: {
                type: String
            },
            code: {
                type: String
            }
        }, {
            name: {
                type: String
            },
            code: {
                type: String
            }
        }, {
            name: {
                type: String
            },
            code: {
                type: String
            }
        }, {
            name: {
                type: String
            },
            code: {
                type: String
            }
        }]
    },
    p_quantity: {
        type: Number
    },
    p_originalprice: {
        type: String
    },
    p_price: {
        type: String
    },
    c_currency: {
        type: String
    }
});

module.exports = mongoose.model('items', schema);
const Trade = require("../models/trades");

const createTrade = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "Get a Trade",
        });
    }

    const { type, symbol, shares, price, user_id, timestamp } = body;

    const trade = {
        type,
        symbol,
        shares,
        price,
        user_id,
        timestamp,
    };

    Trade.create(trade)
        .then((data) => res.status(201).send(data))
        .catch((err) => {
            res.status(500).send({
                message: err.message || "error",
            });
        });
};


const getTradeId = async (req, res) => {
    const id = req.params.id;

    let TradeFound = await Trade.findOne({ id });

    if (TradeFound) {
        return res.status(200).send(TradeFound);
    } else {
        return res.status(404).send('Not found');
    }
}

const getAllTrades = async (req, res) => {
    let queryParams = req.query;
    if (Object.keys(queryParams).length > 0) {
        let keys = Object.keys(queryParams);
        if (keys.length === 1) {
            let allTrades = []
            if (keys[0] === 'type') {
                allTrades = await Trade.findAll({ where: { type: queryParams[keys] } });
            }
            if (keys[0] === 'user_id') {
                allTrades = await Trade.findAll({ where: { user_id: queryParams[keys] } });
            }
            return allTrades.length > 0 ? res.status(200).send(allTrades.sort((a, b) => a.id > b.id ? 1 : -1)) : res.status(200).send([]);
        } else {
            let allTrades = await Trade.findAll({ where: { type: queryParams[keys[1]], user_id: queryParams[keys[0]] } });
            return res.status(200).send(allTrades.sort((a, b) => a.id > b.id ? 1 : -1));
        }
    } else {
        let allTrades = await Trade.findAll({});
        if (allTrades) {
            return res.status(200).send(allTrades.sort((a, b) => a.id > b.id ? 1 : -1));
        }
    }
}

module.exports = {
    createTrade,
    getTradeId,
    getAllTrades,
};

const Mock = require('mockjs');
const moment = require('moment');

module.exports = {
    useMock: true,
    mockConfig: {
        'GET /api/crm/userInfo': (req, res) => {
            res.json({
                code: 0,
                msg: '',
                data: {
                    userName:'admin'
                }
            })
        },
    }
}
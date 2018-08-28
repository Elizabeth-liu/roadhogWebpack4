const mockjs = require('mockjs');

const proxy = {
  'POST /midway/api/forms': (req, res) => {
    res.send({message: 'Ok'});
  },
  'POST /api/login/account': (req, res) => {
    const {password, userName, type} = req.body;
    res.send({
      status: password === '888888' && userName === 'admin' ? 'ok' : 'error',
      type,
    });
  },
  'POST /api/register': (req, res) => {
    res.send({status: 'ok'});
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      "timestamp": 1513932555104,
      "status": 500,
      "error": "error",
      "message": "error",
      "path": "/base/category/list"
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      "timestamp": 1513932643431,
      "status": 404,
      "error": "Not Found",
      "message": "No message available",
      "path": "/base/category/list/2121212"
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      "timestamp": 1513932555104,
      "status": 403,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
  'GET /midway/api/console/getUserVisitedProduct/*': (req, res) => {
    res.send({
      success: true,
      data: [
        {
          type: 1,
          id: 1,
          name: 'es'
        },
        {
          type: 1,
          id: 2,
          name: 'kafka'
        }
      ],
    });
  },
  'GET /midway/api/console/gettodothings': (req, res) => {
    res.send({
      success: true,
      data: {
        examine: 6,
        error: 7,
        workOrder: 8,
      },
    });
  },
  'GET /midway/api/console/getnotice': (req, res) => {
    res.send({
      success: true,
      data: {
        notice: [
          {
            id: 1,
            title: '测试通知公告测试通知公告测试通知公告测试通知公告测试通知公告',
          },
          {
            id: 2,
            title: '测试通知公告测试通知公告测试通知公告测试通知公告测试通知公告',
          },
          {
            id: 3,
            title: '测试通知公告测试通知公告测试通知公告测试通知公告测试通知公告',
          }
        ],
        productMsg: [
          {
            id: 1,
            title: '测试产品公告测试通知公告测试通知公告测试通知公告测试通知公告',
          },
          {
            id: 2,
            title: '测试产品公告测试通知公告测试通知公告测试通知公告测试通知公告',
          },
          {
            id: 3,
            title: '测试产品公告测试通知公告测试通知公告测试通知公告测试通知公告',
          }
        ],
      },
    });
  },
};

module.exports = proxy;

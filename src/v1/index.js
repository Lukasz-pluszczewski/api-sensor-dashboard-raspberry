import { Router as router } from 'express';
import { ObjectID } from 'mongodb';
import { find, findLast, insert, remove, update } from 'services/mongoDatabaseService';

export default ({ db, sensorsInstance }) => {
  const api = router();

  api.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      dbConnected: db.serverConfig.isConnected(),
    });
  });

  api.get('/sensors', (req, res) => {
    sensorsInstance.getSavedData(req.query.start, req.query.end)
      .then(result => res.json(result))
      .catch(error => res.status(500).json({ message: error.message }));
  });

  return api;
};

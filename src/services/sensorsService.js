import axios from 'axios';
import _ from 'lodash';
import { insert, find } from 'services/mongoDatabaseService';
import config from '../config';

const isValidDate = date => (date instanceof Date && !isNaN(date));

const sensorsService = ({ db }) => {
  console.log('Creating sensors service');

  const axiosInstance = axios.create({
    baseURL: config.sensorsHost,
    headers: { authentication: config.sensorsPassword },
  });

  const sensorsServiceInstance = {
    interval: null,
    startMonitoring: (interval = config.sensorsInterval) => {
      sensorsService.interval = setInterval(sensorsServiceInstance.getSensorsData, interval);
    },
    stopMonitoring: () => {
      clearInterval(sensorsServiceInstance.interval);
    },
    getSensorsData: () => {
      axiosInstance.get('/sensor')
        .then(response => {
          // handle success
          console.log('Sensors response', response.data);

          if (response.data.isValid) {
            const temperature = {
              value: response.data.temperature,
              timestamp: new Date(),
            };

            insert(db, 'temperature-1')(temperature)
              .then(result => console.log('Temperature saved', result))
              .catch(error => console.log('Saving temperature failed', error));

            const humidity = {
              value: response.data.humidity,
              timestamp: new Date(),
            };

            insert(db, 'humidity-1')(humidity)
              .then(result => console.log('Humidity saved', result))
              .catch(error => console.log('Saving humidity failed', error));
          } else {
            console.log('Sensors error', 'Data not valid');
          }
        })
        .catch(error => {
          // handle error
          console.log('Sensors errors', error);
        });
    },
    getSavedData: (start, end) => {
      const query = {};

      if (start && isValidDate(new Date(start))) {
        _.set(query, 'timestamp.$gte', new Date(start));
      }
      if (end && isValidDate(new Date(end))) {
        _.set(query, 'timestamp.$lt', new Date(end));
      }

      return new Promise((resolve, reject) => {
        Promise.all([
          find(db, 'temperature-1')(query),
          find(db, 'humidity-1')(query),
        ])
          .then(([temperature, humidity]) => {
            resolve({ temperature, humidity });
          })
          .catch(reject);
      });
    },
  };

  return sensorsServiceInstance;
};

export default sensorsService;

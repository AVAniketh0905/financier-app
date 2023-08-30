import { silverData } from './silverdata';

const getSilverStockData = async () => {
  const stockData = await fetch(
    'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-chart?interval=1d&symbol=SI%3DF&range=1mo&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true',
    {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.X_RAPID_API_KEY || '',
        'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.chart.result[0])
    .catch((err) => console.log(err));

  return stockData;
};

const getSilverPrediction = async (date?: Date) => {
  const dateStr =
    date?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0];
  const silverPred = await fetch(
    `https://hlpt4kykpc.execute-api.ap-southeast-2.amazonaws.com/predict?date=${dateStr}&sequence_length=10`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.AWS_SILVER_API_KEY || '',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.prediction)
    .catch((err) => console.log(err));

  return silverPred;
};

export const getModularStockData = async () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      timestamp: silverData.timestamp,
      indicators: {
        adjclose: [
          {
            adjclose: silverData.indicators.adjclose[0].adjclose,
          },
        ],
      },
    };
  } else {
    const data = await getSilverStockData();
    return data;
  }
};

export const getModularStockPrediction = async (date?: Date) => {
  if (process.env.NODE_ENV === 'development') {
    return 0;
  } else {
    const preds = await getSilverPrediction(date);
    return preds;
  }
};

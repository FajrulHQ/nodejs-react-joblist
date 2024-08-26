const axios = require('axios');

const getPosition = async (req, res) => {
  try {
    const { URL_API } = process.env
    if (!URL_API) {
      res.status(500).json({ message: 'Error fetching data', error: 'System error' });
    }
    let { data } = await axios.get(URL_API, { params: req.query });
    
    if (req.query.full_time === 'true') {
      data = data.filter(item => item && item?.type === 'Full Time')
    } else {
      data = data.filter(item => item && item?.type !== 'Full Time')
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

const getPositionByID = async (req, res) => {
  try {
    const { id } = req.params
    const { URL_API } = process.env
    if (!URL_API) {
      res.status(500).json({ message: 'Error fetching data', error: 'System error' });
    }
    let { data } = await axios.get(URL_API);
    data = data.find(item => item.id === id)
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

module.exports = {
  getPosition,
  getPositionByID
}
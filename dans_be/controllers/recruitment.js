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
    if (req.query.company) {
      data = data.filter(item => item && (item.company || '').toLowerCase().includes(req.query.company))
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
    const selected_data = data.find(item => item.id === id)
    if (selected_data.id) {
      selected_data['more_jobs'] = data.filter(item => item.company === selected_data.company).length
    }
    res.json(selected_data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

module.exports = {
  getPosition,
  getPositionByID
}
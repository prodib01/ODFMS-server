const FeedModel = require('../models/Feed');

const addfeed = async (req, res) => {
  const { name, cost_per_unit, unit } = req.body;
  try {
    await FeedModel.addfeed(name, cost_per_unit, unit);
    res.status(200).json({
        status: 'Success',
        message: 'Feed added successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
        status: 'error',
        message: 'Failed to add feed'
    });
  }
};

const addfeedinventory = async (req, res) => {
    const { feed_id, quantity } = req.body;
    try {
        await FeedModel.addfeedinventory(feed_id, quantity);
        res.status(200).json({
            status: 'Success',
            message: 'Feed inventory added successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to add feed inventory'
        });
    }
};

const addfeedingschedules = async (req, res) => {
    const { cow, feed_id, quantity, schedule_date } = req.body;
    try {
        await FeedModel.addfeedingschedules(cow, feed_id, quantity, schedule_date);
        res.status(200).json({
            status: 'Success',
            message: 'Feeding schedule added successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to add feeding schedule'
        });
    }
};

const addFeedingCost = async (req, res) => {
  try {
    const { feeding_schedule_id } = req.body;
    const feedingSchedule = await FeedModel.getFeedingScheduleById(feeding_schedule_id);
    if (!feedingSchedule) {
      return res.status(404).json({ error: 'Feeding schedule not found' });
    }

    const feed = await FeedModel.getFeedById(feedingSchedule.feed_id);
    if (!feed) {
      return res.status(404).json({ error: 'Feed not found' });
    }

    const total_cost = feedingSchedule.quantity * feed.cost_per_unit;
    const result = await FeedModel.insertFeedingCost(feeding_schedule_id, total_cost);
    res.json(result);
  } catch (error) {
    console.error('Error adding feeding cost:', error);
    res.status(500).json({ error: 'An error occurred while adding feeding cost' });
  }
};

const getfeeds = async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }

        const feeds = await FeedModel.getFeeds();
        return res.status(200).json({
            status: 'success',
            message: 'Feeds fetched successfully',
            feeds
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

//get feeding schedule by id
const getFeedingScheduleById = async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const scheduleId = req.params.scheduleId;
        const schedule = await FeedModel.getFeedingScheduleById(scheduleId);
        if (!schedule) {
            return res.status(404).json({
                status: 'error',
                message: 'Feeding schedule not found'
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Feeding schedule fetched successfully',
            schedule // Assuming schedule is an array of objects
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};



const updatefeed = async (req, res) => {
    const { name, cost_per_unit, unit } = req.body;
    const feedId = req.params.feedId;
    try {
        await FeedModel.updatefeed(name, cost_per_unit, unit, feedId);
        res.status(200).json({
            status: "success",
            message: "Feed updated successfully"
        });
    } catch (error) {
        console.error('Error in updatefeed controller:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update feed'
        });
    }
};

const deletefeed = async (req, res) => {
    const feedId = req.params.feedId;
try {
    const feed = await FeedModel.getFeedById(feedId);
    if (!feed) {
        return res.status(404).json({
            status: 'error',
            message: 'Feed record not found'
        });
    }
    await FeedModel.deletefeed(feedId);
    res.status(200).json({
        status: "success",
        message: "Feed record deleted successfully"
    });
} catch (error) {
    console.error(error);
    return res.status(500).json({
        status: 'error',
        message: 'Failed to delete feed record'
    });
}                                                                                                                                                                                                                                                                                                                           
};

module.exports = {
    addfeed,
    addfeedinventory,
    addfeedingschedules,
    addFeedingCost,
    getfeeds,
    updatefeed,
    deletefeed,
    getFeedingScheduleById
};
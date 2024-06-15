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
        const feed = await FeedModel.getFeedById(feed_id);
        if (!feed) {
            return res.status(404).json({
                status: 'error',
                message: 'No feed record'
            });
        }

        const total_cost = quantity * feed.cost_per_unit;

        const result = await FeedModel.addfeedinventory(feed_id, quantity, total_cost);
        res.status(200).json({
            status: 'Success',
            message: 'Feed inventory added successfully',
            data: result
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
    
    // Validate request body
    if (!Number.isInteger(cow) || !Number.isInteger(feed_id) || quantity <= 0 || isNaN(Date.parse(schedule_date))) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid input'
        });
    }
    
    try {
 
        // Check if the feed exists
        const feed = await FeedModel.getFeedById(feed_id);
        if (!feed) {
            return res.status(404).json({
                status: 'error',
                message: 'Feed not found'
            });
        }

        const total_cost = quantity * feed.cost_per_unit;

        const result = await FeedModel.addfeedingschedule(cow, feed_id, quantity, schedule_date, total_cost);

        // Return the result as JSON
        res.json(result);
    } catch (error) {
        console.error('Error adding feeding schedule:', error);
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
        // Extract token from the headers
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }

        // Extract id from the request parameters
        const { id } = req.params;

        // Validate id
        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'Bad Request: ID is required'
            });
        }

        // Fetch the feeding schedule by id
        const schedule = await FeedModel.getFeedingscheduleById(id);
        if (!schedule) {
            return res.status(404).json({
                status: 'error',
                message: 'Feeding schedule not found'
            });
        }

        // Return the schedule
        return res.status(200).json({
            status: 'success',
            message: 'Feeding schedule fetched successfully',
            schedule
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const getschedules = async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            })
        }
        const schedules = await FeedModel.getFeedingSchedules();
        return res.status(200).json({
            status:'success',
            message: 'Feeding schedules fetched successfully',
            schedules
        });
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};



const updatefeed = async (req, res) => {
    const { feedId: schedule_id } = req.params;
    const { cow, feed_id, quantity, schedule_date } = req.body;

    try {
        // Check if the feeding schedule exists
        const schedule = await FeedModel.getFeedingscheduleById(schedule_id);
        if (!schedule) {
            return res.status(404).json({
                status: 'error',
                message: 'Feeding schedule not found'
            });
        }

        // Check if the feed exists
        const feed = await FeedModel.getFeedById(feed_id);
        if (!feed) {
            return res.status(404).json({
                status: 'error',
                message: 'Feed not found'
            });
        }

        const total_cost = quantity * feed.cost_per_unit;

        // Update the feeding schedule
        const result = await FeedModel.updateFeedingschedule(schedule_id, cow, feed_id, quantity, schedule_date, total_cost);

        // Return the result as JSON
        return res.json({
            status: 'success',
            data: result
        });
    } catch (error) {
        console.error('Error updating feeding schedule:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to update feeding schedule'
        });
    }
};




const deletefeed = async (req, res) => {
    const { feedId } = req.params;

    try {
        // Check if the feeding schedule exists
        const schedule = await FeedModel.getFeedingscheduleById(feedId);
        if (!schedule) {
            return res.status(404).json({
                status: 'error',
                message: 'Feeding schedule not found'
            });
        }

        // Delete the feeding schedule by calling model function
        await FeedModel.deleteFeedingschedule(feedId); // Pass feedId instead of feed

        // Return success response
        res.json({
            status: 'success',
            message: 'Feeding schedule deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting feeding schedule:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete feeding schedule'
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
    getFeedingScheduleById,
    getschedules
};
import { responses } from '../Common/responseAPI.js';
import { db } from '../Common/connectDB.js';

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // check inputs
    if (!id) {
      responses._404(res, { message: 'Failed' });
      return;
    }

    // get profile with id
    const [existedUser] = await db.select('*').from('users').where({ id });

    if (!existedUser) {
      responses._404(res, { message: 'Failed' });
      return;
    }

    // send response
    responses._200(res, { user: existedUser, message: 'Sucessful' });
  } catch (error) {
    responses._401(res, { message: 'Failed' });
  }
};

export const updateProfileEntries = async (req, res) => {
  try {
    const { id } = req.body;

    // check inputs
    if (!id) {
      responses._404(res, { message: 'Failed' });
      return;
    }

    // update profile entries point
    const [userEntries] = await db
      .returning('entries')
      .select('*')
      .from('users')
      .where({ id })
      .increment('entries', 1);

    if (!userEntries) {
      responses._404(res, { message: 'Failed' });
      return;
    }

    // send response
    responses._200(res, {
      entries: userEntries.entries,
      message: 'Sucessful',
    });
  } catch (error) {
    responses._401(res, { message: 'Failed' });
  }
};

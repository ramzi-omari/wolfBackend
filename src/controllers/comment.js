import { MISSING_REQUIRED_FIELDS, USER_INFO_POPULATE } from "../config/constants";
import Journal from "../models/journal";
import Comment from "../models/comment";

/// @route put publication/comment
/// @desc add comment to publications
/// @access User
export const CommentPublication = async (req, res) => {
    try {
        const { id_publication: id, comment } = req.body;
        const userId = req.user.id;

        if (!id || !comment) {
            return res.status(400).json({ success: false, message: MISSING_REQUIRED_FIELDS })
        }

        const publication = await Journal.findById(id);

        if (!publication) {
            return res.status(400).json({ success: false, message: 'Publication not found' })
        }

        const newComment = new Comment ({
            comment,
            user: userId,
            publication: id,
        })
    

        const savedComment = await newComment.save();
        const myComment = await Comment.find({_id: savedComment._id }).populate('user', USER_INFO_POPULATE);
        return res.status(200).json({ success: true, comment: myComment });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
}

/// @route put publication/comment/edit
/// @desc Edit comment to publications
/// @access User
export const EditCommentPublication = async (req, res) => {
    try {
        const { id_comment: id, comment } = req.body;
        const userId = req.user.id;

        if (!id || !comment) {
            return res.status(400).json({ success: false, message: MISSING_REQUIRED_FIELDS })
        }

        const commentFromDB = await Comment.findOne({_id: id, user:userId }).populate('user', USER_INFO_POPULATE);

        if (!commentFromDB) {
            return res.status(400).json({ success: false, message: 'Comment not found' });
        }

        commentFromDB.comment = comment;
         
        const savedComment = await commentFromDB.save();
        return res.status(200).json({ success: true, comment: savedComment });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
}

/// @route delete publication/delete/:id
/// @desc delete comment to publications
/// @access User
export const DeleteCommentFromPublication = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        if (!id) {
            return res.status(400).json({ success: false, message: MISSING_REQUIRED_FIELDS })
        }

        const DeleteComment = await Comment.findOneAndDelete({_id: id, user:userId });

        if (!DeleteComment) {
            return res.status(400).json({ success: false, message: 'Comment not found to be deleted' });
        }
        return res.status(200).json({ success: true, message: "comment was deleted succesfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
}


/// @route get publication/comments
/// @desc delete comment to publications
/// @access User
export const GetCommentByPublication = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        if (!id) {
            return res.status(400).json({ success: false, message: MISSING_REQUIRED_FIELDS })
        }

        const comments = await Comment.find({publication: id }).populate('user', USER_INFO_POPULATE);

        return res.status(200).json({ success: true, comments });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
}

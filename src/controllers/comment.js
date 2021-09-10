import { MISSING_REQUIRED_FIELDS } from "../config/constants";
import Journal from "../models/journal";
import Comment from "../models/comment";

/// @route put publication/like
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
        return res.status(200).json({ success: true, comment: savedComment });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }
}

/// @route put publication/like
/// @desc Edit comment to publications
/// @access User
export const EditCommentPublication = async (req, res) => {
    try {
        const { id_comment: id, comment } = req.body;
        const userId = req.user.id;

        if (!id || !comment) {
            return res.status(400).json({ success: false, message: MISSING_REQUIRED_FIELDS })
        }

        const commentFromDB = await Comment.findOne({_id: id, user:userId });

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

/// @route put publication/like
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


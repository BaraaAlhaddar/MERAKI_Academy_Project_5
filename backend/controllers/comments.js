const { pool } = require("../models/db");

const createComment = (req, res) => {
    const  post_id   = req.params.id;
    const { comment , user_id } = req.body;
    const data = [comment , user_id ,post_id];
    console.log(data)
    const query = `INSERT INTO comments (comment,post_id,user_id) VALUES ($1,$2,$3) RETURNING  *;`;
    pool.query(query, data)
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Comment created successfully",
                result: result.rows,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error",
                err: err,
            });
        });
    }

    const deleteComment = (req, res) => {
        const {id} = req.body;
        const data = [id];
        const query = `DELETE FROM  comments WHERE id=$1 RETURNING  *;`;
        pool.query(query, data)
            .then((result) => {
                res.status(201).json({
                    success: true,
                    message: "Comment delete successfully",
                });
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: "Server error",
                    err: err,
                });
            });
        }


        const getAllCommentForPostComment = (req, res) => {
            const {id} = req.params;
            const {orderby} = req.body;
            const data = [id];
            const query = `SELECT * FROM comments WHERE posts_id=$1 ORDER BY created_at VALUE ${orderby} ;`;       
            pool.query(query, data)
                .then((result) => {

                    console.log("result");
                    res.status(201).json({
                        success: true,
                        message: "Get all comment for this post successfully",
                        result: result.rows,
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        success: false,
                        message: "Server error",
                        err: err,
                    });
                });
            }

            // const getAllCommentForPostCommentACS = (req, res) => {
            //     const {id} = req.params;
            //     const data = [id];
            //     const query = `SELECT * FROM comments WHERE posts_id=$1 ORDER BY created_at ASC  ;`;
            //     pool.query(query, data)
            //         .then((result) => {
    
            //             console.log("result");
            //             res.status(201).json({
            //                 success: true,
            //                 message: "Get all comment for this post successfully",
            //                 result: result.rows,
            //             });
            //         })
            //         .catch((err) => {
            //             res.status(500).json({
            //                 success: false,
            //                 message: "Server error",
            //                 err: err,
            //             });
            //         });
            //     }


    module.exports = {
        createComment,
        deleteComment,
        getAllCommentForPostComment,
    };


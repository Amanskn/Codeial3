{
    console.log("home_posts_comments script loaded");

    let createComment=function(){

        let newCommentForms=$('.new-comment-form');

        newCommentForms.each(function(){
            $(this).submit(function(e){
                e.preventDefault();
                $.ajax({
                    type:'post',
                    url:'/comments/create',
                    data:$(this).serialize(),
                    success:function(data){
                        // console.log(data.data.comment.content);

                        let newComment=newCommentDom(data.data.comment);
                        $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                        deleteComment($(' .delete-comment-button',newComment));

                        

                        new Noty({
                            theme: 'relax',
                            text: data.message,
                            type: "success",
                            layout: "topRight",
                            timeout: 1500
        
                        }).show();


                    },
                    error:function(err){
                        console.log("Inside err");
                        console.log(err.responseText);
                    }
                })
    
    
    
                
            })
    
        })

    }


    function newCommentDom(comment){
        return $(`<li type="square" id="comment-${comment._id}">
        <p>
            
                <small>
                    <a href="/comments/destroy/${comment._id}"  class="delete-comment-button">
                        Delete this comment    
                    </a>
                </small>
            
    
            <big>
                ${ comment.content}
            </big>
            
            <br>
            <br>
            <small>
                  ~ Commented by :- ${comment.user.name}
            </small>
        </p>
    </li>`)

    }


    // method to delete a comment from the DOM
    let deleteComment=function(deleteLink){

        
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    // console.log("Executed");
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: data.message,
                        type: "success",
                        layout: "topRight",
                        timeout: 1500
    
                    }).show();

                },
                error:function(error){
                    console.log(error.responseText);
                }


            });
        });

    }


    createComment();
    $('.delete-comment-button').each(function() {
        deleteComment($(this));
    });


}
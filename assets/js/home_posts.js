{
    //  this is just a check
    console.log("home_posts script loaded");



    // method to submit the form data for new post using Ajax
    let createPost=function(){

        // console.log("Create post called");
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            // console.log("Now starting");
            $.ajax({
                type : 'post',
                url : "/posts/create",
                data : newPostForm.serialize(),
                success : function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);

                    // The space character is important because it 
                    // specifies that the class name delete-post-button 
                    // should be a descendant of newPost, not an exact match.
                    //  Without the space, the selector would look for an element
                    //  with the exact class name delete-post-button that is a 
                    // child of newPost. By including the space, we are searching
                    //  for any descendant elements with the class delete-post-button, 
                    // whether they are direct children or nested deeper within newPost.          
                    deletePost($(' .delete-post-button',newPost));

                    
                    new Noty({
                        theme: 'relax',
                        text: data.message,
                        type: "success",
                        layout: "topRight",
                        timeout: 1500
    
                    }).show();
                },
                error: function(err){
                    console.log(err.responseText);
                }


            })




        })

    }


    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">
                        Delete this post
                    </a>
                </small>
            
            <big>
                ${post.content}
            </big>
            <br>
            <br>
            
            <small class="author-info-container">
                ~ Posted by :- ${post.user.name}
            </small>
        </p>
    
        <div class="post-comments">
            
    
                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="Type here to comment..." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
    
                </form>
    
            
            <div class="post-comments-list">
    
                <ul id="post-comments-${post._id}">
    
                   
                </ul>
    
            </div>                    
    
        </div>
        <hr>    
    </li>
    `);

    }

    // method to delete a post from the DOM
    let deletePost=function(deleteLink){

        
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    // console.log("Executed");
                    $(`#post-${data.data.post_id}`).remove();
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


    createPost();

    // looping through all the delete button of pre available posts on the page
    $('.delete-post-button').each(function() {
        deletePost($(this));
    });
    
}
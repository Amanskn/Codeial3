{
    //  this is just a check
    console.log("home_posts script loaded");



    // method to submit the form data for new post using Ajax
    let createPost=function(){

        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : "/posts/create",
                data : newPostForm.serialize(),
                success : function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
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
    </li>
    <hr>`)

    }

    createPost();
}
import React from 'react';

// CRIANDO O COMPONENT DOS POSTADORES
function PostHeader({author, date}){
    return (
        <div className="postHeader">
            <img src={author.avatar} className="userHeader" alt="foto-usuario"/>
            <div className="detailsUser">
                <span>{author.name}</span>
                <span>{author.date}</span>
            </div>
        </div>
    );
};

// CRIANDO O SUBCOMPONENT DE COMENTARIOS
function PostComments({ comments }){
    return(
        <div className="postComments">
            <div className="divider">
                {comments.map(
                    comment =>(
                    <div key={comment.id}className="comment">
                        <img src={comment.author.avatar} className="avatarComment"/>
                        <p>                        
                            <span>{comment.author.name}</span>
                            {comment.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// funcção que vai chamar todos as funcoes acima e que no meu viewer eu executarei ela apenas
function PostItem({author, date, content, comments}){
    return(
        <div className="posts">
            <PostHeader author={author} date={date}/>
            <p className="post-content">{content}</p>
            <PostComments comments={comments}/>
        </div>
    );
};


export default PostItem;
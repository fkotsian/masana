module Api
  class CommentsController < ApplicationController

    def index
      @comments = Item.find(params[:item_id]).comments
      render :index
    end

    def comments
      @user_comments = current_user.comments
      render :index
    end

    def create
      @comment = Comment.new(comment_params)
      if @comment.save
        render partial: 'api/comments/comment', locals: { comment: @comment }
      else
        render json: { errors: @comment.errors.full_messages }, status: 422
      end
    end

    def update
      @comment = Comment.find(params[:id])
      if @comment.update_attributes(comment_params)
        render partial: 'api/comments/comment', locals: { comment: @comment }
      else
        render json: { errors: @comment.errors.full_messages }, status: 422
      end
    end

    def destroy
      Comment.find(params[:id]).try(:destroy)
      render json: {}
    end

    private
    def comment_params
      params.require(:comment).permit(:body, :user_id, :item_id)
    end
  end
end

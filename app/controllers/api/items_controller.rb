module Api
  class ItemsController < ApplicationController

    def index
      @items = List.find(params[:list_id]).items
      render :index
    end

    def show
      @item = Item.find(params[:id])
      render partial: 'api/items/item', locals: { item: @item }
    end

    def create
      @item = Item.new(item_params)

      # sibling_items = List.find(params[:list_id]).items
      if !@item.rank
        # max_rank = sibling_items.maximum(:rank) || 0
        # @item.rank = max_rank + 1
        @item.rank = 1
      end

      overlapping_rank_items = Item.where('list_id = ? AND rank >= ?', [ params[:list_id], @item.rank ])
      overlapping_rank_items.each do |item|
        item.update_attributes({ rank: item.rank + 1 })
      end

      if @item.save
        render partial: 'api/items/item', locals: { item: @item }
      else
        render json: { errors: @item.errors.full_messages }, status: 422
      end
    end

    def update
      @item = Item.find(params[:id])

      if params[:newAssigneeEmail]
        email = params[:newAssigneeEmail]
        new_assignee = User.find_by_email(email)
        params[:item][:user_id] = new_assignee.id
      end

      if @item.update_attributes(item_params)
        render partial: 'api/items/item', locals: { item: @item }
      else
        render json: { errors: @item.errors.full_messages }, status: 422
      end
    end

    def destroy
      Item.find(params[:id]).try(:destroy)
      render json: {}
    end

    private
    def item_params
      params.require(:item).permit(:id, :title, :description, :due_date, :completed, :rank, :list_id, :user_id)
    end
  end
end

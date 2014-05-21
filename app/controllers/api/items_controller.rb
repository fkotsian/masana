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
      if @item.save
        render partial: 'api/items/item', locals: { item: @item }
      else
        render json: { errors: @item.errors.full_messages }, status: 422
      end
    end

    def update
      @item = Item.find(params[:id])
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
      params.require(:item).permit(:title, :description, :due_date, :completed, :list_id, :user_id)
    end
  end
end

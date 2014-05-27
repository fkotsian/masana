module Api
  class ListsController < ApplicationController

    def index
      @lists = Project.find(params[:project_id]).lists
      render :index
    end

    def show
      @list = List.find(params[:id])
      render partial: 'api/lists/list', locals: { list: @list }
    end

    def create
      @list = List.new(list_params)
      if @list.save
        render partial: 'api/lists/list', locals: { list: @list }
      else
        render json: { errors: @list.errors.full_messages }, status: 422
      end
    end

    def update
      @list = List.find(params[:id])

      if @list.update_attributes(list_params)
        render partial: 'api/lists/list', locals: { list: @list }
      else
        render json: { errors: @list.errors.full_messages }, status: 422
      end
    end

    def destroy
      List.find(params[:id]).try(:destroy)
      render json: {}
    end

    private
    def list_params
      params.require(:list).permit(:title, :description, :project_id)
    end
  end
end

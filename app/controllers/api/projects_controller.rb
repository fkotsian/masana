module Api
  class ProjectsController < ApplicationController

    def index
      @projects = Project.all
      render :index
    end

    def show
      @project = Project.find(params[:id])
      render partial: 'api/projects/project', locals: { project: @project }
    end

    def create
      @project = current_user.projects.build(project_params)
      if @project.save
        render partial: 'api/projects/project', locals: { project: @project }
      else
        render json: { errors: @project.errors.full_messages }, status: 422
      end
    end

    def update
      @project = current_user.projects.find(params[:id])

      if params[:newMemberEmail]
        email = params[:newMemberEmail]
        new_member = User.find_by_email(email)
        new_member &&
          !@project.members.include?(new_member) &&
           @project.members << new_member
      end

      if @project.update_attributes(board_params)
        render partial: 'api/projects/project', locals: { project: @project }
      else
        render json: { errors: @projects.errors.full_messages }, status: 422
      end
    end

    def destroy
      current_user.owned_projects.find(params[:id]).try(:destroy)
      render json: {}
    end

    private
    def project_params
      params.require(:project).permit(:title)
    end
  end
end

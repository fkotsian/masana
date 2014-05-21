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
  end

  def destroy
  end

  private
  def project_params
    params.require(:project).permit(:title)
  end

end

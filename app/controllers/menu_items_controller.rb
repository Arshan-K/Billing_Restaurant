class MenuItemsController < ApplicationController
  # before_action :authenticate_user!
    def index
      render json: MenuItem.includes(:category).as_json(
        include: { category: { only: [:id, :name] } }
      )
    end
  
    def create
      render json: MenuItem.create!(menu_params)
    end
  
    def update
      item = MenuItem.find(params[:id])
      item.update!(menu_params)
      render json: item
    end
  
    def destroy
      MenuItem.find(params[:id]).update!(active: false)
      head :no_content
    end
  
    private
  
    def menu_params
      params.require(:menu_item)
            .permit(:name, :price, :category_id, :image_url, :active)
    end
  end
  
class CategoriesController < ApplicationController
  before_action :authenticate_user!
    def index
      categories = Category.active.includes(:menu_items)
      render json: categories.as_json(
        only: [:id, :name],
        include: {
          menu_items: {
            only: [:id, :name, :price, :image_url]
          }
        }
      )
    end
  
    def create
      render json: Category.create!(category_params)
    end
  
    def update
      category = Category.find(params[:id])
      category.update!(category_params)
      render json: category
    end
  
    private
  
    def category_params
      params.require(:category).permit(:name, :position, :active)
    end
  end
  
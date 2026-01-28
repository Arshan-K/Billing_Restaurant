class BillsController < ApplicationController
  # before_action :authenticate_user!

  def create
    user = demo_user

    bill = user.bills.create!(
      payment_method: params[:payment_method],
      total_amount: 0
    )

    total = 0

    params[:items].each do |item|
      menu = MenuItem.find(item[:menu_item_id])
      line_total = menu.price * item[:quantity]

      bill.bill_items.create!(
        menu_item: menu,
        quantity: item[:quantity],
        price_at_time: menu.price,
        total_price: line_total
      )

      total += line_total
    end

    bill.update!(total_amount: total)

    render json: bill, status: :created
  end

  def index
    render json: demo_user.bills.order(created_at: :desc)
  end

  def show
    bill = demo_user.bills
      .includes(bill_items: :menu_item)
      .find(params[:id])

    render json: bill.as_json(
      include: {
        bill_items: {
          include: {
            menu_item: {
              only: [:id, :name]
            }
          },
          only: [:id, :quantity, :price_at_time, :total_price]
        }
      }
    )
  end
end

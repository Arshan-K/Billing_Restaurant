class ApplicationController < ActionController::API
  # before_action :authenticate_user!

   def demo_user
    @demo_user ||= User.first || User.create!(
      email: "demo@example.com",
      password: "password123"
    )
  end
  private

  def authenticate_user!
    header = request.headers['Authorization']

    unless header&.start_with?('Bearer')
      return render_unauthorized
    end

    token = header.split(' ').last
    decoded = JsonWebToken.decode(token)

    unless decoded && decoded[:user_id]
      return render_unauthorized
    end

    @current_user = User.find_by(id: decoded[:user_id])

    return render_unauthorized unless @current_user
  end

  def render_unauthorized
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end

class UsersController < ApplicationController
    def index
      @users = User.all
      render json: @users, only: [:id, :name, :phone_number, :role]
    end
  end
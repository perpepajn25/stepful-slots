class BookingsController < ApplicationController
    before_action :find_user
    before_action :ensure_student
    before_action :set_slot
    
      def book
        return render json: { error: 'Slot unavailable' }, status: :unprocessable_entity if @slot.student.present?
    
        if @slot.update(student: @user)
          render json: @slot
        else
          render json: { errors: @slot.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
    
      private

      def find_user
        @user = User.find_by(id: params[:student_id])
        render json: { error: 'User not found' }, status: :not_found unless @user
      end
    
      def set_slot
        @slot = Slot.find_by(id: params[:id])
        render json: { error: 'Slot not found' }, status: :not_found unless @slot
      end
    
      def ensure_student
        return if @user.student?
    
        render json: { error: 'Only students can perform this action' }, status: :forbidden
      end
  end
class Users::SlotsController < ApplicationController
    before_action :find_user
    before_action :ensure_coach, only: [:create, :update]
    before_action :set_slot, only: [:update]

    def index
        if @user.role == 'coach'
          @slots = @user.coach_slots.order(start_time: :desc)
        else
          student_slots = @user.student_slots.order(start_time: :desc)
          available_slots = Slot.available.order(start_time: :desc)
          @slots = student_slots + available_slots
        end

        render json: @slots.as_json(include: [:coach, :student])
      end
    
      def create
        @slot = @user.coach_slots.new(slot_params)
        if @slot.save
            render json: @slot, status: :created
        else
            render json: { errors: @slot.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      def create
        @slot = @user.coach_slots.build(slot_params)
        if @slot.save
          render json: @slot, status: :created
        else
          render json: { errors: @slot.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      def update
        if @slot.update(update_slot_params)
          render json: @slot
        else
          render json: { errors: @slot.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      private

      def find_user
        @user = User.find_by(id: params[:user_id])
        render json: { error: 'User not found' }, status: :not_found unless @user
      end
    
      def set_slot
        @slot = Slot.find_by(id: params[:id])
        render json: { error: 'Slot not found' }, status: :not_found unless @slot
      end
    
      def ensure_coach
        return if @user.coach?
    
        render json: { error: 'Only coaches can perform this action' }, status: :forbidden
      end
    
      def slot_params
        params.require(:slot).permit(:start_time, :end_time)
      end
    
      def update_slot_params
        params.require(:slot).permit(:notes, :satisfaction_score)
      end
  end
defmodule Engine do
  def login(user) do
    Wrapper.create_user(user)
  end
end

defmodule HelloPhoenixApiWeb.OnlineChannel do
  use HelloPhoenixApiWeb, :channel

  def join("online:lobby", _payload, socket) do
    {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @spec handle_in(<<_::40>>, any, any) :: {:reply, {:ok, any}, any}
  def handle_in("login", payload, socket) do
    #userName = elem(Map.fetch(payload, :name), 1)
    #IO.inpect(socket)
    #transport_pid = elem(Map.fetch(socket, :transport_pid), 1)
    #user = %{uid: userName, pid: transport_pid}
    #IO.inspect(user)
    #Engine.login(user)
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("tweet", payload, socket) do
    IO.inspect(socket)
    # TODO code to make tweet
    {:reply, {:ok, payload}, socket}
  end
end

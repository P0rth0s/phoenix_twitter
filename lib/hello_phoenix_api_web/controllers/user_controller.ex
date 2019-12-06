defmodule HelloPhoenixApiWeb.UserController do
  use HelloPhoenixApiWeb, :controller

  def show(conn, %{"messenger" => messenger}) do
    render(conn, "show.html", messenger: messenger)
  end
end

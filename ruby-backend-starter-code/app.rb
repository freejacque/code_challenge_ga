require 'sinatra/base'
# we want to use the base class of sinatra
require 'redis'
# we want to use redis to persist the data
require 'json'
# we use json to organize our
require 'pry' if ENV["RACK_ENV"] == "development"
require 'uri'

class App < Sinatra::Base


  ######################
  # Configuration
  ######################

  configure do
    uri = URI.parse(ENV["REDISTOGO_URL"])
    $REDIS = REDIS.NEW({:host => uri.host,
                        :port => uri.post,
                        :password => uri.password})
  end


  get '/' do
    # File.read('index.html')
    render(:erb, :index)
  end

  get '/search' do
    render(:erb, :search_form)
  end

  get '/favorites' do
    response.header['Content-Type'] = 'application/json'
    File.read('data.json')
    render(:erb, :favorites)
  end

  post '/favorites' do
    file = JSON.parse(File.read('data.json'))
    unless params[:name] && params[:oid]
      return 'Invalid Request'
    movie = { name: params[:name], oid: params[:oid] }
    file << movie
    File.write('data.json',JSON.pretty_generate(file))
    movie.to_json
  end

end

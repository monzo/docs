FROM ubuntu

RUN apt-get update
RUN apt-get install -yq ruby-full ruby-dev build-essential git
RUN gem install -v 1.17.3 --no-ri --no-rdoc bundler
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN cd /app && bundle install --system
ADD . /app
EXPOSE 4567
WORKDIR /app
CMD ["bundle", "exec", "middleman", "server"]

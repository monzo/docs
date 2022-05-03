# Start from the official Ruby image for 2.6.X, 2.7 works but spams a lot of warnings about stuff being deprecated
# in 3.0, and indeex any Ruby 3 version won't work
FROM ruby:2.6

# Install the highest version of bundler that is compatible with the Gemfile
RUN gem install bundler -N -v 1.17.3
# Install the latest version of Node LTS
# taken from https://github.com/nodesource/distributions/blob/master/README.md#node-lts
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

# Set our working directory
WORKDIR /app

# Add Gemfile and Gemfile.lock and install dependencies before adding the actual app so that
# Docker can cache these layers and reuse them even when we change the app code
ADD Gemfile Gemfile.lock /app/
RUN bundle install

# Finally add the actual app
ADD . /app

# Run the app locally
EXPOSE 4567
CMD ["bundle", "exec", "middleman", "server"]

const express = require('express');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const PORT = process.env.port || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, err => {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.info(`
    ################################################
      Server listening on port: ${PORT}
    ################################################
  `);
});

module.exports = app;

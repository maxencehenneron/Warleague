$(document).ready(function() {
  //initialise network
  window.socketClient = new Network("realmd.warleague.fr", 8080);
  //initialise UI
  window.uiManager = new WarleagueUI();
  window.uiManager.initUI();
});

var WarleagueUI = function(){
  /* 
   * Initialize the game UI interface 
   */
  this.initUI = function(){
    //Setting game windows
    var chat_height = $( window ).height() - 55;
    var chat_left = $( window ).width() - 342;
    var menu_width = $( window ).width();
    var chat_messages_height = $(window).height() - 115;
    $("#chat").css("left", chat_left+ "px");
    $("#chat").css("height", chat_height + "px");
    $("#chat-messages").css("height", chat_messages_height +"px");
    $("#header").css("width", menu_width + "px");
  };

  /* 
   * Setting the UI once connected
   */
  this.startGame = function(){
    $("#header").css("display", "block");
    $("#chat").css("display", "block");
    $("#login-window").hide();
  };

  /* 
   * Displays the register window and hide the login window
   */
  this.displayRegister = function(){
    $('#login').hide();  
    $('#register').show();
  };

  /* 
   * Displays the Login window and hide the register window
   */
  this.displayLogin = function(){
    $('#login').show();  
    $('#register').hide();
  };

  /* 
   * Sends a message to the server
   */
  this.sendMessage = function(event, ref){
    if(event.keyCode == 13){
      socketClient.sendMessage(ref.chatinput.value);
      $("#chat-input").val('');
    }
  }

  /*
   * Append a message to the chat
   */
  this.appendMessage = function(message){
    $('<div class=\"chat-message\"></div>').text(message).appendTo('#chat-messages'); 
    if($("#chat-messages").scrollTop() + $("#chat-messages").height() >= ($("#chat-messages")[0].scrollHeight - 50)) {
      $("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
    } 
  };

  /*
   * Login to the game
   */
  this.login = function(){
    var username = $('#login-username').val();
    var password = $('#login-password').val();

    if(!username || !password){
      displayError("You must fill all the fields");
      return;
    }

    socketClient.sendLoginMessage(username, password);

    function displayError(error){
      $("#login-messagebox").html("<div class=\"alert-message\" style=\"background-color:#e74c3c;\">" + error + "</div>");
    }
  };

  this.register = function(){
    var nameRegex = /^[a-zA-Z\-]+$/;
    var emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}/;
    var username = $("#register-username").val();
    var password = $("#register-password").val();
    var password_r = $("#register-password_reapeat").val();
    var email = $("#register-email").val();

    if(!nameRegex.test(username)){
        displayError("Username is invalid");
        return;  
    }

    if(!emailRegex.test(email)){
        displayError("Email is invalid");
        return;  
    }

    if(!username || !password || !password_r || !email ){
      displayError("You must fill all the fields");
      return;
    }

    if(password != password_r){
      displayError("Passwords don't match");
      return;
    }

    socketClient.sendRegisterMessage(username, password, email);

    function displayError(error){
      $("#register-messagebox").html("<div class=\"alert-message\" style=\"background-color:#e74c3c;\">" + error + "</div>");
    }
  };
};

$( window ).resize(function() { //Resize chat
    var chat_height = $( window ).height() - 55;
    var chat_left = $( window ).width() - 342;
    var menu_width = $( window ).width();
    var chat_messages_height = $(window).height() - 115;
    $("#chat").css("left", chat_left+ "px");
    $("#chat").css("height", chat_height + "px");
    $("#chat-messages").css("height", chat_messages_height +"px");
    $("#header").css("width", menu_width + "px");
});
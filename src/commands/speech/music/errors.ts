function joinErrorHandler(error: any) {
  console.error("Join Error:", error);
}

function playErrorHandler(error: any) {
  console.error("Play Error:", error);
}

function skipErrorHandler(error: any) {
  console.error("Skip Error:", error);
}

function stopErrorHandler(error: any) {
  console.error("Stop Error:", error);
}

function replyErrorHandler(error: any) {
  console.error("Reply Error:", error);
}

export {
  joinErrorHandler,
  playErrorHandler,
  skipErrorHandler,
  stopErrorHandler,
  replyErrorHandler,
};

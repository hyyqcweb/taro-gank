const onJudge = value => {
  if(value === "" || value === "0") {
    value = 'Android';
  }else if(value === "1") {
    value = 'iOS';
  }else if(value === "2") {
    value = '休息视频';
  }else if(value === "3") {
    value = '福利';
  }else if(value === "4") {
    value = '拓展资源';
  }else if(value === "5") {
    value = '前端';
  }else if(value === "6") {
    value = '瞎推荐';
  }else if(value === "7") {
    value = 'App';
  }
  return value
};

export default onJudge

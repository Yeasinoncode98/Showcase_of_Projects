function updateClock() {
    const now = new Date();
  
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
  
    const secondsDeg = seconds * 6; // 360 / 60
    const minutesDeg = minutes * 6 + seconds * 0.1; // 360 / 60 + fraction
    const hoursDeg = (hours % 12) * 30 + minutes * 0.5; // 360 / 12 + fraction
  
    document.getElementById("second").style.transform = `rotate(${secondsDeg}deg)`;
    document.getElementById("minute").style.transform = `rotate(${minutesDeg}deg)`;
    document.getElementById("hour").style.transform = `rotate(${hoursDeg}deg)`;
  }
  
  setInterval(updateClock, 1000);
  updateClock();
  
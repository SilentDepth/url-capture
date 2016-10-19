module.exports = {
  // Ignore the first line when read the data file
  "has_title_row": true,

  // The max number of workers in parallel when capturing multiple URLs
  "max_threads": 10,

  // The max number of time in ms for capturing single URL
  "max_render_time": 10000,

  // The UA to use for capturing in mobile platform simulation
  "ua_mobile": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",

  // The viewport size in px for desktop & mobile platform simulation
  "viewport_size_desktop": {"width": 1600, "height": 1000},
  "viewport_size_mobile": {"width": 375, "height": 667}
};

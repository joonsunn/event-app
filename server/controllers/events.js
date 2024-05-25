const bcrypt = require("bcrypt");
const eventsRouter = require("express").Router();
const Event = require("../models/events");
const middleware = require("../utils/middleware");

eventsRouter.get("/", async (request, response) => {
  const events = await Event.find({});
  return response.json(events);
});

eventsRouter.get("/organiser/:organiser", async (request, response) => {
  const events = await Event.find({
    organiser: request.params.organiser,
  });
  return response.json(events);
});

// TODO: to convert to query params
eventsRouter.get("/status/:status", async (request, response) => {
  // const user = request.user;
  // console.log(request.query);

  const searchCondition = {
    completed: true,
    ongoing: false,
    all: undefined,
  };

  const statusToSearch = request.params.status;

  if (statusToSearch === "all") {
    return response.json(await Event.find({}));
  }

  const events = await Event.find({
    completed: searchCondition[request.params.status],
  });
  return response.json(events);
});

// eventsRouter.get("/:id", async (request, response) => {
//   const event = await Event.findById(request.params.id);
//   if (event) {
//     response.json(event);
//   } else {
//     return response.status(404).end();
//   }
// });

eventsRouter.post(
  "/",
  [
    middleware.tokenExtractor,
    middleware.userExtractor,
    middleware.adminGatekeeper,
  ],
  async (request, response) => {
    //   console.log(request.user);
    const {
      name,
      eventDate,
      time,
      location,
      description,
      completed,
      organiser,
      // organisation,
      // username,
    } = request.body;

    const event = new Event({
      name,
      eventDate,
      time,
      location,
      description,
      completed,
      organiser,
      // username: request.user.username,
    });

    const savedEvent = await event.save();
    return response.status(201).json(savedEvent);
    //   response.status(200).json(request.body);
  }
);

eventsRouter.patch(
  "/updateEvent/:id",
  [
    middleware.tokenExtractor,
    middleware.userExtractor,
    middleware.adminGatekeeper,
  ],
  async (request, response) => {
    const originalEvent = await Event.findById(request.params.id);
    if (!originalEvent) {
      return response.status(404).end();
    }

    const event = {
      name: request.body.name,
      eventDate: request.body.eventDate,
      time: request.body.time, // TODO: add validation for time format
      location: request.body.location,
      description: request.body.description,
      completed: request.body.completed,
      organiser: request.body.organiser,
      edittedDate: Date.now(),
    };
    const updatedEvent = await Event.findByIdAndUpdate(
      request.params.id,
      event,
      {
        new: true,
      }
    );
    return response.json(updatedEvent);
  }
);

eventsRouter.delete(
  "/:id",
  [
    middleware.tokenExtractor,
    middleware.userExtractor,
    middleware.adminGatekeeper,
  ],
  async (request, response) => {
    const eventToBeDeleted = await Event.findById(request.params.id);
    if (!eventToBeDeleted) {
      return response.status(404).end();
    }
    await Event.deleteOne({ _id: request.params.id });
    return response.status(204).end();
  }
);

module.exports = eventsRouter;

const config = {
  application: {
    cors: {
      server: [
        {
          origin: "localhost:5000",
          credentials: true,
        },
      ],
    },
  },
};

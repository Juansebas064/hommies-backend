const config = {
  application: {
    cors: {
      server: [
        {
          origin: "localhost:5500",
          credentials: true,
        },
      ],
    },
  },
};

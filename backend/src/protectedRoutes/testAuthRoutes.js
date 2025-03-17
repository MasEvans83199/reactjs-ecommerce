export const testAuthRoute = {
    path:"/api/test-auth",
    method:"get",
    handler: async (req, res) => {
        const {uid, email} = req.body;
        return res.json({ uid, email });
    },
}
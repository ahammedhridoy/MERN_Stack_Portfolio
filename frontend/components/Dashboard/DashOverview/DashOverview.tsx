import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const DashOverview = () => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">
        Dashboard Overview <hr />
      </h1>
      {/* Dashboard Cards */}
      <div className="grid w-full grid-cols-4 gap-4">
        <Card sx={{ maxWidth: 345 }}>
          <div className="flex justify-center my-4">
            <Image src={"/order.png"} alt="Order" width={80} height={100} />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              TOTAL ORDERS
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <h4 className="text-2xl font-semibold">100K</h4>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <div className="flex justify-center my-4">
            <Image
              src={"/customer.png"}
              alt="Customers"
              width={80}
              height={100}
            />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              TOTAL CUSTOMERS
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <h4 className="text-2xl font-semibold">100K</h4>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <div className="flex justify-center my-4">
            <Image
              src={"/transaction.png"}
              alt="Transaction"
              width={80}
              height={100}
            />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              TOTAL TRANSACTIONS
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <h4 className="text-2xl font-semibold">100K</h4>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <div className="flex justify-center my-4">
            <Image src={"/order.png"} alt="Order" width={80} height={100} />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Total Orders
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <h4 className="text-2xl font-semibold">100K</h4>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <div className="flex justify-center my-4">
            <Image src={"/order.png"} alt="Order" width={80} height={100} />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Total Orders
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <h4 className="text-2xl font-semibold">100K</h4>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <div className="flex justify-center my-4">
            <Image src={"/order.png"} alt="Order" width={80} height={100} />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Total Orders
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <h4 className="text-2xl font-semibold">100K</h4>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <div className="flex justify-center my-4">
            <Image src={"/order.png"} alt="Order" width={80} height={100} />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Total Orders
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <h4 className="text-2xl font-semibold">100K</h4>
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <div className="flex justify-center my-4">
            <Image src={"/order.png"} alt="Order" width={80} height={100} />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Total Orders
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <h4 className="text-2xl font-semibold">100K</h4>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashOverview;

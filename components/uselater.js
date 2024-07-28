/**
 * 
 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {eveningSlots.map((item, key) => {
                  const hour = item.time.toString().padStart(2, "0");
                  const formattedCurrentHour = currentHour
                    .toString()
                    .padStart(2, "0");
                  return (
                    formattedCurrentHour ||
                    (hour !== formattedCurrentHour && currentHour < 12 && (
                      <TimeSlots
                        key={key}
                        timeslots={timedslots}
                        onItemSelect={handleTimeSlots}
                        id={item.id}
                        time={item.time}
                      />
                    ))
                  );
                })}
              </ScrollView>* 
 * 
 * 
 * 
 */
/*




*/
{
  /*
             <View className="p-2 mt-5 ">
            <Text className="text-lg text-orange-500 ">Evening</Text>
            {eveningSlots.length < 0 ? (
              <Text className="font-bold text-lg ml-2 for this period at the moment">
                No time available for this period at the moment
              </Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {eveningSlots.map((item, key) => {
                  <TimeSlots
                    key={key}
                    timeslots={timedslots}
                    onItemSelect={handleTimeSlots}
                    id={item.id}
                    time={item.time}
                  />;
                })}
              </ScrollView>
            )}
          </View>
            
            */
}
 {
   /*
            
            <TouchableOpacity
            onPressIn={()=>navigation.navigate("payment")}
            className={
              selectedItemId === null ||
              appointmentType === " " ||
              timedslots === null
                ? "mt-3 bg-blue-900 p-1 rounded opacity-30"
                : "mt-3 bg-blue-900 p-1 rounded"
            }
            disabled={
              selectedItemId === null ||
              appointmentType == " " ||
              timedslots === null
                ? true
                : false
            }
            onPress={() => {
              console.log("hello");
            }}
          >
            <Text className="m-2 text-white text-center">
              Confirm Appointment
            </Text>
          </TouchableOpacity>
            
             */
 }

<View
  style={{
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  }}
>
  <View className=" h-screen">
    <View className="bg-[#059669] p-2 rounded-b-3xl h-44 justify-between">
      <View className="mb-4">
        <View className="flex-row items-center justify-between">
          <Text className="ml-1 text-white text-lg">Book Appointment</Text>
        </View>
      </View>
      <View className="m-1 flex-row items-center">
        <Image
          source={require("../assets/portrait-3d-female-doctor.jpg")}
          className="w-20 h-20 rounded-full"
        />
        <View className="ml-4">
          <Text className="text-white font-bold text-xl">Dr Rita </Text>
          <Text className="text-white text-xl ">Heart Surgeon</Text>
        </View>
      </View>
    </View>
    {/*second part of the main page */}
    <View className="mt-8 p-2">
      <View>
        <Text className="text-orange-500 text-lg">Choose your slot</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="scroll-smooth"
        >
          {futureDates.map((items, key) => {
            return (
              <View key={key}>
                <SelectAppointmentDate
                  key={key}
                  day={items.data.day}
                  daydate={items.data.date}
                  id={items.id}
                  selectedItemId={selectedItemId}
                  onItemSelect={handleItemSelect}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View className="p-2 mt-5 ">
        <Text className="text-lg text-orange-500 ">Morning</Text>
        {morningSlots.length > 0 ? (
          <Text className="font-bold text-lg ml-2 for this period at the moment">
            No time available for this period at the moment
          </Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {morningSlots.map((item, key) => {
              const hour = item.time.toString().padStart(2, "0");
              const formattedCurrentHour = currentHour
                .toString()
                .padStart(2, "0");
              return (
                hour < formattedCurrentHour ||
                (hour !== formattedCurrentHour && currentHour < 12 && (
                  <TimeSlots
                    key={key}
                    timeslots={timedslots}
                    onItemSelect={handleTimeSlots}
                    id={item.id}
                    time={item.time}
                  />
                ))
              );
            })}
          </ScrollView>
        )}
      </View>
      <View className="p-2 mt-5 ">
        <Text className="text-lg text-orange-500 ">Evening</Text>
        {eveningSlots.length < 0 ? (
          <Text className="font-bold text-lg ml-2 for this period at the moment">
            No time available for this period at the moment
          </Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {eveningSlots.map((item, key) => {
              <TimeSlots
                key={key}
                timeslots={timedslots}
                onItemSelect={handleTimeSlots}
                id={item.id}
                time={item.time}
              />;
            })}
          </ScrollView>
        )}
      </View>
      <View className="mt-5">
        <Text className="text-lg text-orange-500">Appointment Type</Text>
        <View className="flex flex-row items-center">
          <TouchableOpacity
            className={`m-1 p-2 rounded flex items-center flex-row ${
              appointmentType === "Video" ? "bg-blue-500 " : "bg-gray-300"
            }`}
            onPress={() => setAppointmentType("Video")}
          >
            <View className="mr-2 ">
              <Feather name="video" size={20} color="white" />
            </View>

            <Text className="text-white font-bold">Video Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`m-1 p-2 rounded flex items-center flex-row ${
              appointmentType === "Voice" ? "bg-violet-800" : "bg-gray-300"
            }`}
            onPress={() => setAppointmentType("Voice")}
          >
            <View className="mr-2 ">
              <Feather name="phone-call" size={20} color="white" />
            </View>
            <Text className="text-white font-bold">Voice Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`m-1 p-2 rounded flex items-center flex-row ${
              appointmentType === "Message" ? "bg-orange-600" : "bg-gray-300"
            }`}
            onPress={() => setAppointmentType("Message")}
          >
            <View className="mr-2 ">
              <Feather name="message-circle" size={20} color="white" />
            </View>
            <Text className="text-white font-bold">Message</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/*
            
            <TouchableOpacity
            onPressIn={()=>navigation.navigate("payment")}
            className={
              selectedItemId === null ||
              appointmentType === " " ||
              timedslots === null
                ? "mt-3 bg-blue-900 p-1 rounded opacity-30"
                : "mt-3 bg-blue-900 p-1 rounded"
            }
            disabled={
              selectedItemId === null ||
              appointmentType == " " ||
              timedslots === null
                ? true
                : false
            }
            onPress={() => {
              console.log("hello");
            }}
          >
            <Text className="m-2 text-white text-center">
              Confirm Appointment
            </Text>
          </TouchableOpacity>
            
             */}
      <TouchableOpacity
        onPressIn={() => navigation.navigate("confirmappointmnet")}
        className={"mt-3 bg-blue-900 p-1 rounded"}
      >
        <Text className="m-2 text-white text-center">Confirm Appointment</Text>
      </TouchableOpacity>
    </View>
  </View>
  {/*first part of the main page */}
</View>;

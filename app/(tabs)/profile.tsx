import React, { useState, useRef, useEffect } from "react";
import { Animated, Image, TouchableOpacity } from "react-native";
import { View } from "@/components/ui/view";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useMutation, useQuery } from "convex/react";
import { Edit, LogOut } from "lucide-react-native";
import { useColor } from "@/hooks/useColor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BottomSheet, useBottomSheet } from "@/components/ui/bottom-sheet";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { SignOutButton } from "@/components/auth/singout";

export default function ProfileScreen() {
  const bottom = useBottomTabBarHeight();
  const user = useQuery(api.users.get);
  const updateUser = useMutation(api.users.update);

  // Colors from theme
  const backgroundColor = useColor("background");
  const cardColor = useColor("card");
  const cardForeground = useColor("cardForeground");
  const borderColor = useColor("border");
  const primaryColor = useColor("primary");
  const primaryFg = useColor("primaryForeground");
  const accentColor = useColor("accent");
  const destructiveColor = useColor("destructive");
  const destructiveFg = useColor("destructiveForeground");
  const mutedColor = useColor("muted");
  const textColor = useColor("text");
  const textMutedColor = useColor("textMuted");
  const inputColor = useColor("input");
  const shadowColor = useColor("shadow");
  const selectionColor = useColor("selection");

  // Animation state
  const cardAnim = useRef(new Animated.Value(0)).current;
  const avatarAnim = useRef(new Animated.Value(0)).current;

  // Edit bottom sheet state
  const editSheet = useBottomSheet();
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
      Animated.timing(avatarAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }).start();
    }
  }, [user]);

  // Skeleton loader for profile
  const SkeletonProfile = () => (
    <Card
      style={{
        alignItems: "center",
        padding: 32,
        marginTop: 32,
        backgroundColor: cardColor,
        borderColor: borderColor,
        borderWidth: 1,
        borderRadius: 24,
        shadowColor: shadowColor,
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}
    >
      <Skeleton variant="rounded" width={100} height={100} />
      <Skeleton width={120} height={28} style={{ marginTop: 18 }} />
      <Skeleton width={220} height={20} style={{ marginTop: 10 }} />
    </Card>
  );

  // Handler for edit save
  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUser({
        name: editName,
        bio: editBio,
      });
      editSheet.close();
    } catch (e) {
      // TODO: Handle error, show toast maybe
    } finally {
      setSaving(false);
    }
  };

  // Open edit bottom sheet with user info
  const handleEditOpen = () => {
    setEditName(user?.name ?? "");
    setEditBio(user?.bio ?? "");
    editSheet.open();
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor }}
        contentContainerStyle={{ padding: 20, paddingBottom: bottom }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingTop: 64, paddingBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text variant="heading" style={{ color: textColor }}>
              Profile
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ModeToggle />
              <TouchableOpacity onPress={handleEditOpen}>
                <Edit
                  size={24}
                  color={textMutedColor}
                  style={{ marginLeft: 16 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {!user ? (
          <SkeletonProfile />
        ) : (
          <Animated.View
            style={{
              opacity: cardAnim,
              transform: [
                {
                  translateY: cardAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            }}
          >
            <Card
              style={{
                alignItems: "center",
                padding: 32,
                marginTop: 32,
                backgroundColor: cardColor,
                borderColor: borderColor,
                borderWidth: 1,
                borderRadius: 28,
                shadowColor: shadowColor,
                shadowOpacity: 0.13,
                shadowRadius: 14,
                elevation: 8,
              }}
            >
              <Animated.View
                style={{
                  opacity: avatarAnim,
                  transform: [
                    {
                      scale: avatarAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.7, 1],
                      }),
                    },
                  ],
                }}
              >
                <View
                  style={{
                    borderWidth: 4,
                    borderColor: accentColor,
                    borderRadius: 52,
                    padding: 4,
                    marginBottom: 18,
                    backgroundColor: selectionColor,
                    shadowColor: accentColor,
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                  }}
                >
                  <Image
                    source={
                      user.image
                        ? { uri: user.image }
                        : {
                            uri: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                          }
                    }
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      backgroundColor: mutedColor,
                    }}
                  />
                </View>
              </Animated.View>
              <Text
                variant="title"
                style={{ marginTop: 6, color: cardForeground }}
              >
                {user.name}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 4,
                  color: textMutedColor,
                  fontSize: 15,
                }}
              >
                {user.bio ?? "Tell us about yourself!"}
              </Text>
            </Card>
          </Animated.View>
        )}

        {/* Logout button at bottom */}
        {user && (
          <Animated.View
            style={{
              opacity: cardAnim,
              marginTop: 44,
              alignItems: "center",
            }}
          >
            <SignOutButton />
          </Animated.View>
        )}
      </ScrollView>

      {/* Edit Profile BottomSheet */}
      <BottomSheet
        isVisible={editSheet.isVisible}
        onClose={editSheet.close}
        title="Edit Profile"
        snapPoints={[0.5, 0.8]}
        style={{
          // Use solid color for better appearance
          backgroundColor: cardColor, // <--- changed from overlayColor
        }}
      >
        <View
          style={{
            padding: 18,
            backgroundColor: cardColor,
            borderRadius: 16,
            shadowColor: shadowColor,
            shadowOpacity: 0.07,
            shadowRadius: 6,
            elevation: 4,
          }}
        >
          <Input
            label="Name"
            value={editName}
            onChangeText={setEditName}
            inputStyle={{
              marginBottom: 16,
              color: textColor,
              backgroundColor: inputColor, // solid input field
              borderRadius: 14,
              borderColor: primaryColor, // higher contrast border
              borderWidth: 1.5,
              paddingHorizontal: 14,
              paddingVertical: 12,
              fontSize: 17,
              shadowColor: shadowColor,
              shadowOpacity: 0.03,
              shadowRadius: 2,
            }}
            editable={!saving}
          />
          <Input
            label="Bio"
            value={editBio}
            onChangeText={setEditBio}
            multiline
            inputStyle={{
              marginBottom: 16,
              color: textColor,
              backgroundColor: inputColor,
              borderRadius: 14,
              borderColor: primaryColor,
              borderWidth: 1.5,
              paddingHorizontal: 14,
              paddingVertical: 12,
              fontSize: 16,
              minHeight: 48,
              shadowColor: shadowColor,
              shadowOpacity: 0.03,
              shadowRadius: 2,
            }}
            editable={!saving}
          />
          <Button
            loading={saving}
            onPress={handleSave}
            style={{
              marginTop: 10,
              backgroundColor: primaryColor,
              borderRadius: 14,
            }}
            textStyle={{ color: primaryFg, fontWeight: "600" }}
            disabled={saving || !editName.trim()}
          >
            Save Changes
          </Button>
        </View>
      </BottomSheet>
    </>
  );
}

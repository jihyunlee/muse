// AUTOGENERATED FILE - DO NOT MODIFY!
// This file generated by Djinni from muse_file.djinni

#import "IXNMuseFile.h"
#import "IXNMuseFileWriter.h"
#import <Foundation/Foundation.h>
@class IXNAnnotationData;
@class IXNComputingDeviceConfiguration;
@class IXNDspData;
@class IXNMuseConfiguration;
@class IXNMuseDataPacket;
@class IXNMuseVersion;

/**
 * Class manages saving Muse headband packets and other data into a file,
 * which can later be read and replayed by MusePlayer. Google Protobuf is used
 * to store information. For better control data is not written to the file
 * immediately, but store them into a buffer instead. Buffer then can be flushed
 * to a file or discarded.<br>
 * <B>Threading:<B> It is thread safe, so you can call write/get/flush/discard
 * operations from different threads. <br>
 * <B>Important:<B> If you don't call flush() method, messages will be
 * accumulated in memory and eventually you will get memory overflow error.
 * It's library client responsibility to call flush() or discard() and to
 * clean the memory. You can use helper methods to get how many messages are
 * currently stored in the buffer and how much memory is used.
 */

@protocol IXNMuseFileWriter

/** Returns an instance of file writer. Automatically opens a file. <br> */
+ (id <IXNMuseFileWriter>)getFileWriter:(id <IXNMuseFile>)file;

/**
 * Opens a file if it exists or creates a new one.
 * If file exists, then puts pointer to the end of file, so all new messages
 * will be appended at the end.
 * Use this method if you explicitly closed file and want to open it again.
 * Calls Muse File open().
 */
- (void)open;

/**
 * Closes the file. Calls Muse File close().
 * You don't have to call close explicitly unless you want to close file
 * immediately. close is called automatically, when file writer object
 * is destroyed.
 */
- (void)close;

/** Removes all saved messages from the memory. */
- (void)discardBufferedPackets;

/** Flashes saved messages to the disk. Calls Muse File write(). */
- (void)flush;

/** Returns number of saved messages */
- (int32_t)getBufferredMessagesCount;

/** Returns the size of saved messages in bytes */
- (int32_t)getBufferedMessagesSize;

/**
 * Adds Muse Data Packet to the buffer. Not all Data Packets are supported.
 * If unsupported data packet is passed, it will be ignored.
 * All algorithm packets (ALPHA, BETA, HORSESHOE, etc) are ignored by this
 * method. Support for these methods using new message in protobuf shcema
 * will be added in next release.
 * id allows data from multiple devices to be recorded to a single file.
 */
- (void)addDataPacket:(int32_t)id packet:(IXNMuseDataPacket *)packet;

/**
 * Adds annotation string to the buffer. It may be useful if you want to
 * log specific events. This is a simplified version of addAnnotation. Use this
 * method if you want to add one string to protobuf. Use addAnnotation for
 * more advanced options.
 * id allows data from multiple devices to be recorded to a single file.
 * Method does nothing if annotation string is empty.
 */
- (void)addAnnotationString:(int32_t)id annotation:(NSString *)annotation;

/**
 * Adds annotation data structure to the buffer. Similar to addAnnotationString,
 * but this method allows you to extra fields.
 * Empty fields in annotation struct won't be added to protobuf. If
 * annotation.data field is empty, method returns immediately.
 * id allows data from multiple devices to be recorded to a single file.
 */
- (void)addAnnotation:(int32_t)id annotation:(IXNAnnotationData *)annotation;

/**
 * Adds Muse Configuration to the buffer.
 * id allows data from multiple devices to be recorded to a single file.
 */
- (void)addConfiguration:(int32_t)id configuration:(IXNMuseConfiguration *)configuration;

/**
 * Adds Muse Version to the buffer.
 * id allows data from multiple devices to be recorded to a single file.
 */
- (void)addVersion:(int32_t)id version:(IXNMuseVersion *)version;

/**
 * Adds information about running device to the buffer.
 * id allows data from multiple devices to be recorded to a single file.
 */
- (void)addComputingDeviceConfiguration:(int32_t)id configuration:(IXNComputingDeviceConfiguration *)configuration;

/**
 * With this method you can save your custom data.
 * Checkout protobuf schema for details: http://developer.choosemuse.com/data-files
 */
- (void)addDsp:(int32_t)id dsp:(IXNDspData *)dsp;

@end